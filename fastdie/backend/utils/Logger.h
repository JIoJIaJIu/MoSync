#ifndef _LOGGER_H_
#define _LOGGER_H_

#include <Wormhole/FileUtil.h>

class Logger
{
public:
    Logger();
    void write(const char *str);
private:
    Wormhole::FileUtil *util;
};

#endif
