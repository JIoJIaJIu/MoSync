#ifndef _BLUETOOTH_LISTENERS_H_
#define _BLUETOOTH_LISTENERS_H_

#include <MAUtil/BluetoothDiscovery.h>
#include <Wormhole/MessageStream.h>
#include "utils/Logger.h"

class DiscoveryServiceListener: public MAUtil::BluetoothServiceDiscoveryListener
{
public:
    DiscoveryServiceListener(Logger &logger);
    void btNewService(const MAUtil::BtService &serv);
    void btServiceDiscoveryFinished(int state);
private:
    Logger *mLogger; 
};

class DiscoveryDeviceListener: public MAUtil::BluetoothDeviceDiscoveryListener
{
public:
    DiscoveryDeviceListener();
    DiscoveryDeviceListener(Logger &logger);
    void btNewDevice(const MAUtil::BtDevice &dev);
    void btDeviceDiscoveryFinished(int state);
    void setMessage(Wormhole::MessageStream &message);
    void setID(const char* ID);
private:
    char *mID;
    Logger *mLogger;
    Wormhole::MessageStream *mMessage;
    MAUtil::BluetoothDiscoverer *mDiscoverer;
    DiscoveryServiceListener *mDS;
};

#endif
