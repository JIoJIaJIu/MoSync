#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"
#include "Discoverer.h"
#include <conprint.h>

BluetoothDiscoverer::BluetoothDiscoverer()
{
    printf("[Constructor] Discoverer\n");
    mDD = new DiscoveryDeviceListener();
};

void BluetoothDiscoverer::search()
{
    this->startDeviceDiscovery(mDD, true);
};
