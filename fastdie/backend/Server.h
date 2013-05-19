#ifndef _SERVER_H_
#define _SERVER_H_

#include <Wormhole/MessageStream.h>
#include <MAUtil/Server.h>
#include "utils/Logger.h"

class MyServer : public MAUtil::ServerListener
{
public:
    MyServer(Logger *logger);
    void serverAcceptFailed(MAUtil::Server *server, int result);
    void serverAccepted(MAUtil::Server *server, MAUtil::Connection* newConnection);
    void connect(Wormhole::MessageStream &message);
private:
    Wormhole::MessageStream *mMessage; 
    MAUtil::Server *mServer;
    Logger *mLogger;
};

#endif
