#include <MAUtil/BluetoothDiscovery.h>

using namespace MAUtil;

class DiscoveryListener: public BluetoothDeviceDiscoveryListener
{
public:
    DiscoveryListener();
    ~DiscoveryListener();
    void btNewDevice(BtDevice &dev);
    void btDeviceDiscoveryFinished(int state);
};

class Discoverer
{
public:
    Discoverer();
    ~Discoverer();
private:
    DiscoveryListener *mListener;
};
