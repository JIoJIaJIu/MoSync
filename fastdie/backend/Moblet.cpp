#include <Wormhole/HybridMoblet.h>
#include <conprint.h>

#include "Discoverer.h"
#include "BluetoothListeners.h"
#include "utils/Logger.h"
#include "Moblet.h" 

#include "MAHeaders.h" // Defines BEEP_WAV

using namespace NativeUI;

MyMoblet::MyMoblet()
{
    // Show the start page.
    showPage("index.html");

    mLogger = new Logger();
    mLogger->write("INIT\n");

    // Set the sound used by the PhoneGap beep notification API.
    // BEEP_WAV is defined in file Resources/Resources.lst.
    // Below we add our own beep message, to illustrate how to
    // invoke custom C++ code from JavaScript. Do not confuse these
    // two ways of playing a beep sound.
    setBeepSound(BEEP_WAV);

    mDiscoverer = new BluetoothDiscoverer(*mLogger);

    // Register functions to handle custom messages sent
    // from JavaScript.
    addMessageFun(
        "Vibrate",
        (Wormhole::FunTable::MessageHandlerFun)&MyMoblet::vibrate);
    addMessageFun(
        "Beep",
        (Wormhole::FunTable::MessageHandlerFun)&MyMoblet::beep);
    addMessageFun(
        "findDevices",
        (Wormhole::FunTable::MessageHandlerFun)&MyMoblet::findDevices);
    addMessageFun(
        "log",
        (Wormhole::FunTable::MessageHandlerFun)&MyMoblet::log);
}

void MyMoblet::vibrate(Wormhole::MessageStream& message)
{
    int duration = MAUtil::stringToInteger(message.getNext());
    maVibrate(duration);
}

void MyMoblet::beep(Wormhole::MessageStream& message)
{
    // This is how to play a sound using MoSync API.
    maSoundPlay(BEEP_WAV, 0, maGetDataSize(BEEP_WAV));
}

void MyMoblet::findDevices(Wormhole::MessageStream& message)
{
    mDiscoverer->search(message);
}

void MyMoblet::log(Wormhole::MessageStream& message)
{
    const char *callbackId = message.getNext();

    MAUtil::String script = "mosync.bridge.reply(";
    script += callbackId;
    script += ", 'YAZ')";

    mLogger->write(script.c_str());
    message.callJS(script);
}
