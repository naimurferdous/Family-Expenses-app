package com.family.budget;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;

/**
 * Minimal, auditable in-app updater for APKs published as GitHub Releases.
 *  - download(): HTTPS only, GitHub hosts only, streams to the app cache and computes SHA-256 while writing
 *  - install():  only files inside the app cache, handed to the Android package installer through FileProvider
 * Android itself still refuses any update that is not signed with the same key as the installed app.
 */
@CapacitorPlugin(name = "ApkInstaller")
public class ApkInstallerPlugin extends Plugin {

    private static boolean allowedHost(String h) {
        return h != null && (h.equals("github.com") || h.endsWith(".github.com") || h.endsWith(".githubusercontent.com"));
    }

    @PluginMethod
    public void canInstall(PluginCall call) {
        boolean ok = Build.VERSION.SDK_INT < Build.VERSION_CODES.O
                || getContext().getPackageManager().canRequestPackageInstalls();
        JSObject r = new JSObject();
        r.put("allowed", ok);
        call.resolve(r);
    }

    @PluginMethod
    public void openSettings(PluginCall call) {
        try {
            Intent i = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                    Uri.parse("package:" + getContext().getPackageName()));
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage() == null ? "cannot open settings" : e.getMessage());
        }
    }

    @PluginMethod
    public void download(final PluginCall call) {
        final String url = call.getString("url");
        if (url == null || !url.startsWith("https://")) {
            call.reject("https url required");
            return;
        }
        new Thread(new Runnable() {
            @Override
            public void run() {
                HttpURLConnection c = null;
                try {
                    URL u = new URL(url);
                    if (!allowedHost(u.getHost())) {
                        call.reject("host not allowed");
                        return;
                    }
                    File dir = getContext().getCacheDir();
                    File[] old = dir.listFiles();
                    if (old != null) {
                        for (File f : old) {
                            if (f.getName().startsWith("update-") && f.getName().endsWith(".apk")) f.delete();
                        }
                    }
                    File out = new File(dir, "update-" + System.currentTimeMillis() + ".apk");
                    int hops = 0;
                    while (true) {
                        c = (HttpURLConnection) u.openConnection();
                        c.setConnectTimeout(15000);
                        c.setReadTimeout(30000);
                        c.setInstanceFollowRedirects(false);
                        c.setRequestProperty("Accept", "application/octet-stream");
                        c.setRequestProperty("User-Agent", "FamilyExpenses-Updater");
                        int code = c.getResponseCode();
                        if (code >= 300 && code < 400 && hops++ < 5) {
                            String loc = c.getHeaderField("Location");
                            c.disconnect();
                            if (loc == null) { call.reject("bad redirect"); return; }
                            u = new URL(u, loc);
                            if (!"https".equals(u.getProtocol()) || !allowedHost(u.getHost())) {
                                call.reject("redirect not allowed");
                                return;
                            }
                            continue;
                        }
                        if (code != 200) {
                            call.reject("HTTP " + code);
                            return;
                        }
                        break;
                    }
                    int total = c.getContentLength();
                    MessageDigest md = MessageDigest.getInstance("SHA-256");
                    long got = 0, last = 0;
                    InputStream in = c.getInputStream();
                    FileOutputStream fo = new FileOutputStream(out);
                    try {
                        byte[] buf = new byte[32768];
                        int n;
                        while ((n = in.read(buf)) > 0) {
                            fo.write(buf, 0, n);
                            md.update(buf, 0, n);
                            got += n;
                            if (got - last >= 65536) {
                                last = got;
                                JSObject p = new JSObject();
                                p.put("bytes", got);
                                p.put("total", total);
                                notifyListeners("progress", p);
                            }
                        }
                    } finally {
                        fo.close();
                        in.close();
                    }
                    StringBuilder hex = new StringBuilder();
                    for (byte b : md.digest()) hex.append(String.format("%02x", b));
                    JSObject r = new JSObject();
                    r.put("path", out.getAbsolutePath());
                    r.put("sha256", hex.toString());
                    r.put("size", out.length());
                    call.resolve(r);
                } catch (Exception e) {
                    call.reject(e.getMessage() == null ? "download failed" : e.getMessage());
                } finally {
                    if (c != null) c.disconnect();
                }
            }
        }).start();
    }

    @PluginMethod
    public void install(PluginCall call) {
        try {
            String p = call.getString("path");
            if (p == null) { call.reject("path required"); return; }
            File f = new File(p);
            String cache = getContext().getCacheDir().getCanonicalPath();
            if (!f.getCanonicalPath().startsWith(cache + File.separator) || !f.isFile()) {
                call.reject("file not allowed");
                return;
            }
            Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", f);
            Intent i = new Intent(Intent.ACTION_VIEW);
            i.setDataAndType(uri, "application/vnd.android.package-archive");
            i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(i);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage() == null ? "install failed" : e.getMessage());
        }
    }
}
