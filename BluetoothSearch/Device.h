#include <MAUtil/BluetoothDiscovery.h>

using namespace MAUtil;

class Device: public BluetoothDeviceDiscoveringListener {
    public:
        Device();
        void btNewDevice(const BtDevice& dev);
        void btDeviceDiscoveringFinished();
};
