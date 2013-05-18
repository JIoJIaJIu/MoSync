#ifndef _BLUETOOTH_LISTENERS_H_
#define _BLUETOOTH_LISTENERS_H_

#include <MAUtil/BluetoothDiscovery.h>

class DiscoveryDeviceListener: public MAUtil::BluetoothDeviceDiscoveryListener
{
public:
    DiscoveryDeviceListener();
    void btNewDevice(const MAUtil::BtDevice &dev);
    void btDeviceDiscoveryFinished(int state);
};

#endif
