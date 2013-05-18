/**
 * @file main.cpp
 *
 * This template application shows how to extend the
 * functionality in HTML5/JS with custom code in C++.
 */

#include <ma.h>
#include "backend/Moblet.h"

/**
 * Main function that is called when the program starts.
 * Here an instance of the MyMoblet class is created and
 * the program enters the main event loop.
 */
extern "C" int MAMain()
{
	(new MyMoblet())->enterEventLoop();
	return 0;
}
