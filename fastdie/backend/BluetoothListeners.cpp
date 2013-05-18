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
//	const char* callbackId = mMessage->getNext();

    mLogger->write(dev.name.c_str());
 //   mLogger->write(callbackId);

  //  script += callbackId;
    script += "2, '";
    script += dev.name.c_str();
    script += "')";
    mMessage->callJS(script);

    mLogger->write(script.c_str());
}

void DiscoveryDeviceListener::btDeviceDiscoveryFinished(int state)
{
    mLogger->write("btDeviceDiscoveryFinished");
}

void DiscoveryDeviceListener::setMessage(Wormhole::MessageStream &message)
{
    mMessage = &message;
}
