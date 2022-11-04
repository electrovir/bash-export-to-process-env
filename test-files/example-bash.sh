#!/bin/bash

export EXAMPLE_VAR="hello-there";
export
NEWLINE_NO_WORK="hello-there-also";
export WITH_SPACE=herp derp;
export WITH_SPACE_IN_QUOTES="herp derp";
export WITH_INTERPOLATION="$(echo "$WITH_SPACE")"