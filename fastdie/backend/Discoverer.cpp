#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"
#include <conprint.h>

using namespace MAUtil;

BluetoothDiscoverer::BluetoothDiscoverer()
{
    printf("[Constructor] Discoverer\n");
    mDD = new DiscoveryDeviceListener();
    //this->startDeviceDiscovery(mDListener, true);
};

