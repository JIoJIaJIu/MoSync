#include "Discoverer.h"
#include <conprint.h>

using namespace MAUtil;

Discoverer::Discoverer()
{
    printf("[Constructor] Discoverer\n");
};

Discoverer::~Discoverer()
{
    printf("[Desctructor] Discoverer\n");
};

void DiscoveryListener::btNewDevice(BtDevice &dev)
{
};

void DiscoveryListener::btDeviceDiscoveryFinished(int state)
{
};
