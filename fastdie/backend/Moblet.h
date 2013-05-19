#include <Wormhole/HybridMoblet.h>
#include <conprint.h>

#include "Discoverer.h"
#include "BluetoothListeners.h"
#include "Server.h"
#include "utils/Logger.h"

using namespace NativeUI;

class MyMoblet : public Wormhole::HybridMoblet
{
public:
	MyMoblet();
    void vibrate(Wormhole::MessageStream& message);
    void beep(Wormhole::MessageStream& message);
    void findDevices(Wormhole::MessageStream& messsage);
    void gameCreate(Wormhole::MessageStream& message);
    void log1(Wormhole::MessageStream& message);
private:
    BluetoothDiscoverer *mDiscoverer;
    Logger *mLogger;
    MyServer *mServer;
};
