#include "Device.h"

void Device::btNewDevice(const BtDevice& dev) {
    printf("Found new device %s\n", dev.name);
};
