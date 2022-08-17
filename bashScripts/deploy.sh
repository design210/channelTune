#!/bin/bash

echo ">> start of deploy ... "

# All deploy files "cp" to root directory
# -r 옵션을 사용하지 않으면 폴더복사를 못함
rm -rf /home/centos/channeltune_admin/www/js
rm -rf /home/centos/channeltune_admin/www/css
rm -rf /home/centos/channeltune_admin/www/fonts
rm -rf /home/centos/channeltune_admin/www/img
\cp -rf /home/centos/deployZip/* /home/centos/channeltune_admin/www

echo ">> end of deploy ... "