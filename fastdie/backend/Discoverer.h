#include "MAUtil/BluetoothDiscovery.h"
#include "BluetoothListeners.h"

class BluetoothDiscoverer : public MAUtil::BluetoothDiscoverer
{
public:
    BluetoothDiscoverer();
private:
    DiscoveryDeviceListener *mDD;
};
