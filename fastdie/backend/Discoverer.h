#ifndef _DISCOVERER_H_
#define _DISCOVERER_H_

#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"
#include <Wormhole/MessageStream.h>
#include "utils/Logger.h"

class BluetoothDiscoverer : public MAUtil::BluetoothDiscoverer
{
public:
    BluetoothDiscoverer();
    BluetoothDiscoverer(Logger &aLogger);
    void search(Wormhole::MessageStream& message, const char *ID);
private:
    DiscoveryDeviceListener *mDD;
};

#endif
