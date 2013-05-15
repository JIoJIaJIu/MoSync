#include <MAUtil/BluetoothDiscovery.h>

using namespace MAUtil;

class Device: public BluetoothDeviceDiscoveryListener {
    public:
        Device(Moblet* moblet);
        ~Device();
        void btNewDevice(const BtDevice& dev);
        void btDeviceDiscoveringFinished();
    private:
        BluetoothDiscoverer* mDiscoverer;
};
