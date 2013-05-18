#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"
#include "Discoverer.h"
#include <conprint.h>

#include <Wormhole/MessageStream.h>

BluetoothDiscoverer::BluetoothDiscoverer()
{
    printf("[Constructor] Discoverer\n");
    mDD = new DiscoveryDeviceListener();
};

void BluetoothDiscoverer::search(Wormhole::MessageStream &message)
{
    mDD->setMessage(message);
    this->startDeviceDiscovery(mDD, true);
};
