#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"
#include "Discoverer.h"
#include <conprint.h>
#include "utils/Logger.h"

#include <Wormhole/MessageStream.h>

BluetoothDiscoverer::BluetoothDiscoverer(Logger &aLogger)
{
    printf("[Constructor] Discoverer\n");
    mDD = new DiscoveryDeviceListener(aLogger);
};

void BluetoothDiscoverer::search(Wormhole::MessageStream &message, const char *ID)
{
    if (ID == NULL)
        return;

    mDD->setID(ID);
    mDD->setMessage(message);
    this->startDeviceDiscovery(mDD, true);
};
