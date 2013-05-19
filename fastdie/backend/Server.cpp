#include <Wormhole/MessageStream.h>
#include "Server.h"
#include <MAUtil/Server.h>
#include <MAUtil/mauuid.h>
#include "utils/Logger.h"

DEFINE_BTMAUUID(MY_SERVER_UUID, 0x1163);
MyServer::MyServer(Logger *logger)
{
    mLogger = logger;
    mServer = new MAUtil::Server(this);
    mLogger->write("[CONSTUCTOR] Server");
}

void MyServer::serverAcceptFailed(MAUtil::Server *server, int result)
{
}

void MyServer::serverAccepted(MAUtil::Server *server, MAUtil::Connection* newConnection)
{
}

void MyServer::connect(Wormhole::MessageStream &message)
{
    char output[256];
    mLogger->write("malloc output");

    
    sprintf(output,
        "btspp://localhost:%08x%08x%08x%08x;name=%s\0",
        MY_SERVER_UUID.i[0],
        MY_SERVER_UUID.i[1],
        MY_SERVER_UUID.i[2],
        MY_SERVER_UUID.i[3],
        "FastDie");

     mLogger->write(output);

     MAUtil::String script = "mosync.brige.reply(";

     script += message.getNext();
     script += ", '";
     script += output;
     script += "')";

     mLogger->write(script.c_str());
     message.callJS(script);
}
