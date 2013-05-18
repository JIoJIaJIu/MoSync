#include <Wormhole/FileUtil.h>
#include <MAUtil/String.h>
#include "Logger.h"

Logger::Logger()
{
    util = new Wormhole::FileUtil; 
}

void Logger::write(char *str)
{
    MAUtil::String file;
    file += "/storage/sdcard0/mosync.txt";

    MAUtil::String data;
    data += str;

    util->writeTextToFile(file, data);
}
