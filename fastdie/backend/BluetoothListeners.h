#ifndef _BLUETOOTH_LISTENERS_H_
#define _BLUETOOTH_LISTENERS_H_

#include <MAUtil/BluetoothDiscovery.h>

class DiscoveryDeviceListener: public MAUtil::BluetoothDeviceDiscoveryListener
{
public:
    DiscoveryDeviceListener();
    ~DiscoveryDeviceListener();
    void btNewDevice(MAUtil::BtDevice &dev);
    void btDeviceDiscoveryFinished(int state);
};

#endif
