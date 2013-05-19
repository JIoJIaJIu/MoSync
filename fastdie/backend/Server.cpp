#include <Wormhole/MessageStream.h>
#include "Server.h"

MyServer::MyServer(Wormhole::MessageStream &message)
{
    mMessage = &message;
}
