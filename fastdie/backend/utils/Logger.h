#include <Wormhole/FileUtil.h>

class Logger
{
public:
    Logger();
    void write(const char *str);
private:
    Wormhole::FileUtil *util;
};
