/**
 * @author Tres Finocchiaro
 *
 * Copyright (C) 2013 Tres Finocchiaro, QZ Industries
 *
 * IMPORTANT: This software is dual-licensed
 *
 * LGPL 2.1 This is free software. This software and source code are released
 * under the "LGPL 2.1 License". A copy of this license should be distributed
 * with this software. http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * QZ INDUSTRIES SOURCE CODE LICENSE This software and source code *may* instead
 * be distributed under the "QZ Industries Source Code License", available by
 * request ONLY. If source code for this project is to be made proprietary for
 * an individual and/or a commercial entity, written permission via a copy of
 * the "QZ Industries Source Code License" must be obtained first. If you've
 * obtained a copy of the proprietary license, the terms and conditions of the
 * license apply only to the licensee identified in the agreement. Only THEN may
 * the LGPL 2.1 license be voided.
 *
 */
package qz;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.NetworkInterface;
import java.net.Socket;
import java.net.SocketAddress;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.util.logging.Level;
import qz.reflection.Reflect;

/**
 *
 * @author Thomas Hart II
 */
public class NetworkInfoFinder implements Runnable {
    
    NetworkUtilities utils;
    String hostname;
    int port;
    
    NetworkInfoFinder(NetworkUtilities utils, String hostname, int port) {
        this.utils = utils;
        this.hostname = hostname;
        this.port = port;
    }
    
    public void run() {
        AccessController.doPrivileged(new PrivilegedAction<Object>() {

            public Object run() {
                try {

                    Socket socket = new Socket();
                    
                    SocketAddress endpoint = new InetSocketAddress(hostname, port);
                    socket.connect(endpoint);
                    InetAddress localAddress = socket.getLocalAddress();
                    utils.setIpAddress(localAddress.getHostAddress());
                    socket.close();
                    System.out.println(localAddress.getHostAddress());
                    NetworkInterface networkInterface = NetworkInterface.getByInetAddress(localAddress);
                    Reflect r = Reflect.on(networkInterface);
                    byte[] b = (byte[]) r.call("getHardwareAddress").get();
                    if (b != null && b.length > 0) {
                        utils.setMacAddress(ByteUtilities.bytesToHex(b));
                    }
                } catch (IOException ex) {
                    LogIt.log(Level.WARNING, "IO Exception. Could not find network info.", ex);
                }
                utils.doneFindingNetworkInfo();
                return null;
            }
            
        });
    }
}
