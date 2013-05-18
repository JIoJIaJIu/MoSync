#ifndef _DISCOVERER_H_
#define _DISCOVERER_H_

#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"

class BluetoothDiscoverer : public MAUtil::BluetoothDiscoverer
{
public:
    BluetoothDiscoverer();
    void search();
private:
    DiscoveryDeviceListener *mDD;
};

#endif
