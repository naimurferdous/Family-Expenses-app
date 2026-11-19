package com.family.budget;

import android.app.PendingIntent;
import android.content.Intent;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.gms.auth.api.identity.AuthorizationRequest;
import com.google.android.gms.auth.api.identity.AuthorizationResult;
import com.google.android.gms.auth.api.identity.Identity;
import com.google.android.gms.common.api.Scope;
import java.util.Collections;

/**
 * "Sign in with Google" for Drive backup. Asks only for the hidden per-app Drive folder (drive.appdata).
 * Returns a short-lived access token; nothing long-lived is stored by the app.
 * interactive=false never shows UI (used by the daily auto backup); it rejects with "needs_ui" instead.
 */
@CapacitorPlugin(name = "GoogleDriveAuth", requestCodes = {9341})
public class GoogleDriveAuthPlugin extends Plugin {
    private static final int RC = 9341;

    @PluginMethod
    public void getToken(PluginCall call) {
        final boolean interactive = Boolean.TRUE.equals(call.getBoolean("interactive", false));
        AuthorizationRequest req = AuthorizationRequest.builder()
                .setRequestedScopes(Collections.singletonList(new Scope("https://www.googleapis.com/auth/drive.appdata")))
                .build();
        Identity.getAuthorizationClient(getActivity()).authorize(req)
                .addOnSuccessListener(r -> {
                    if (r.hasResolution()) {
                        if (!interactive) { call.reject("needs_ui"); return; }
                        try {
                            saveCall(call);
                            PendingIntent pi = r.getPendingIntent();
                            getActivity().startIntentSenderForResult(pi.getIntentSender(), RC, null, 0, 0, 0, null);
                        } catch (Exception e) { call.reject("auth_failed"); }
                    } else {
                        reply(call, r);
                    }
                })
                .addOnFailureListener(e -> call.reject("auth_failed: " + e.getMessage()));
    }

    private void reply(PluginCall call, AuthorizationResult r) {
        String t = r.getAccessToken();
        if (t == null) { call.reject("auth_failed"); return; }
        JSObject o = new JSObject();
        o.put("token", t);
        call.resolve(o);
    }

    @Override
    protected void handleOnActivityResult(int requestCode, int resultCode, Intent data) {
        super.handleOnActivityResult(requestCode, resultCode, data);
        if (requestCode != RC) return;
        PluginCall call = getSavedCall();
        if (call == null) return;
        try {
            reply(call, Identity.getAuthorizationClient(getActivity()).getAuthorizationResultFromIntent(data));
        } catch (Exception e) {
            call.reject("auth_failed");
        }
        freeSavedCall();
    }
}
