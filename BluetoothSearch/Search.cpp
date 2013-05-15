#include <MAUtil/Moblet.h>

using namespace Moblet;

extern "C" int MAMain() {
    moblet = new Moblet();
    Moblet::run(moblet);
    return 0;
};
