#include "Device.h"

Device::Device(Moblet* moblet) {
    mDiscoverer = new BluetoothDiscoverer;
    mDiscoverer.startDeviceDiscoverer(this, true)
};

void Device::btNewDevice(const BtDevice& dev) {
//    printf("Found new device %s\n", dev.name);
};
