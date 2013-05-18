#include <Wormhole/FileUtil.h>
#include <MAUtil/String.h>
#include "Logger.h"

Logger::Logger()
{
    util = new Wormhole::FileUtil; 
}

void Logger::write(const char *str)
{
    MAUtil::String file;
    file += "/storage/sdcard0/mosync.txt";

    MAUtil::String data;
    data += str;


    MAUtil::String predata;
    util->readTextFromFile(file, predata);
    predata +=data;
    util->writeTextToFile(file, predata);
}
