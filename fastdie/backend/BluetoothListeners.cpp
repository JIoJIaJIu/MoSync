#include "BluetoothListeners.h"
#include <Wormhole/MessageStream.h>
#include <MAUtil/String.h>
#include "utils/logger.h"

DiscoveryDeviceListener::DiscoveryDeviceListener(Logger &aLogger)
{
    mLogger = &aLogger;
}

void DiscoveryDeviceListener::btNewDevice(const MAUtil::BtDevice &dev)
{
    mLogger->write("Finded new device");
    MAUtil::String script = "mosync.bridge.reply("; 
	const char* callbackId = mMessage->getNext();

    script += callbackId;
    script += ", '";
    script += dev.name.c_str();
    script += "')";
    mMessage->callJS(script);
}

void DiscoveryDeviceListener::btDeviceDiscoveryFinished(int state)
{
    mLogger->write("btDeviceDiscoveryFinished");
}

void DiscoveryDeviceListener::setMessage(Wormhole::MessageStream &message)
{
    mMessage = &message;
}
