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

import java.security.AccessController;
import java.security.PrivilegedAction;
import java.util.logging.Level;
import jssc.SerialPortList;

/**
 * SerialPortFinder creates a privileged object to scan the system's serial ports
 * and returns the data to the SerialPrinter object that spawned it
 * 
 * @author Thomas Hart II
 */
public class SerialPortFinder implements Runnable {
    
    SerialPrinter printer;
    
    SerialPortFinder(SerialPrinter printer) {
        this.printer = printer;
    }
    
    public void run() {
        
        AccessController.doPrivileged(new PrivilegedAction<Object>() {
            public Object run() {
                String serialPorts = "";
                Boolean serialPortsFound = false;

                try {
                    StringBuilder sb = new StringBuilder();
                    String[] portArray = SerialPortList.getPortNames();
                    for (int i = 0; i < portArray.length; i++) {
                        sb.append(portArray[i]).append(i < portArray.length - 1 ? "," : "");
                    }
                    serialPorts = sb.toString();
                    serialPortsFound = true;
                    LogIt.log("Found Serial Ports: " + serialPorts);
                }
                catch (NullPointerException ex) {
                    LogIt.log(Level.SEVERE, "Null pointer.", ex);
                }
                catch (NoClassDefFoundError ex) {
                    LogIt.log(Level.SEVERE, "Problem communicating with the JSSC class.", ex);
                }

                printer.doneFindingPorts(serialPorts, serialPortsFound);
                return null;
            }
        });
        
    }
    
}
