#include <MAFS/File.h>

class Logger
{
public:
    Logger();
    void write(char *str);
private:
    FILE *fd;
};
