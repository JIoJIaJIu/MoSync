#include <MAFS/File.h>
#include "Logger.h"

Logger::Logger()
{
    fd = fopen("/storage/sdcard0/mosync.log", "w+");
}

void Logger::write(char *str)
{
    fputs(str, fd);
}
