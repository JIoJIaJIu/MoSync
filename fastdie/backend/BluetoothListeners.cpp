#include "BluetoothListeners.h"
#include <Wormhole/MessageStream.h>
#include <MAUtil/String.h>

DiscoveryDeviceListener::DiscoveryDeviceListener()
{
}

void DiscoveryDeviceListener::btNewDevice(const MAUtil::BtDevice &dev)
{
    MAUtil::String script = "mosync.bridge.reply("; 
	const char* callbackId = mMessage->getNext();

    script += callbackId;
    script += ", '";
    script += dev.name.c_str();
    script += "')";
    lprintfln(script.c_str());
    mMessage->callJS(script);
}

void DiscoveryDeviceListener::btDeviceDiscoveryFinished(int state)
{
}

void DiscoveryDeviceListener::setMessage(Wormhole::MessageStream &message)
{
    mMessage = &message;
}
