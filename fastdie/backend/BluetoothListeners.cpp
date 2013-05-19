#include "BluetoothListeners.h"
#include <Wormhole/MessageStream.h>
#include <MAUtil/String.h>
#include "utils/logger.h"
#include "Common.h"

DiscoveryDeviceListener::DiscoveryDeviceListener(Logger &aLogger)
{
    mLogger = &aLogger;
    //mDS = new DiscoveryServiceListener(aLogger);
}

void DiscoveryDeviceListener::btNewDevice(const MAUtil::BtDevice &dev)
{
    mDiscoverer = new MAUtil::BluetoothDiscoverer();

    mLogger->write("Finded new device");

    MAUtil::String script = "mosync.bridge.reply("; 

    mLogger->write(dev.name.c_str()); 
    script += mID;
    script += ", '";
    script += dev.name.c_str();
    script += "')";

    mMessage->callJS(script);
    mLogger->write(script.c_str());
    mDiscoverer->startServiceDiscovery(dev.address, MY_SERVER_UUID, (new DiscoveryServiceListener(*mLogger)));
    mLogger->write("GO");
}

void DiscoveryDeviceListener::btDeviceDiscoveryFinished(int state)
{
    mLogger->write("btDeviceDiscoveryFinished");
}

void DiscoveryDeviceListener::setID(const char *ID)
{
    mID = new char(strlen(ID));
    mID = strncpy(mID, ID, strlen(ID));
}

void DiscoveryDeviceListener::setMessage(Wormhole::MessageStream &message)
{
    mMessage = &message;
}

DiscoveryServiceListener::DiscoveryServiceListener(Logger &logger)
{
    mLogger = &logger;
}

void DiscoveryServiceListener::btNewService(const MAUtil::BtService &serv)
{
    mLogger->write("\tnewService");
}

void DiscoveryServiceListener::btServiceDiscoveryFinished(int state)
{
    mLogger->write("\tServiceDiscoveryFinished");
}
