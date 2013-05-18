#ifndef _DISCOVERER_H_
#define _DISCOVERER_H_

#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"

#include <Wormhole/MessageStream.h>

class BluetoothDiscoverer : public MAUtil::BluetoothDiscoverer
{
public:
    BluetoothDiscoverer();
    void search(Wormhole::MessageStream& message);
private:
    DiscoveryDeviceListener *mDD;
};

#endif
