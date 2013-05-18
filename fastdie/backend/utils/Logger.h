#include <Wormhole/FileUtil.h>

class Logger
{
public:
    Logger();
    void write(char *str);
private:
    Wormhole::FileUtil *util;
};
