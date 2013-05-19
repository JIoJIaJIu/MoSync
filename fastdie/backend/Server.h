#ifndef _SERVER_H_
#define _SERVER_H_

#include <Wormhole/MessageStream.h>

class MyServer
{
public:
    MyServer();
    MyServer(Wormhole::MessageStream &message);
private:
    Wormhole::MessageStream *mMessage; 
};

#endif
