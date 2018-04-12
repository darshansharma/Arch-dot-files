#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
PS1='[\u@\h \W]\$ '
alias connzscaler="sudo openconnect --juniper https://connect.corp.zscaler.com/pulse --no-cert-check"
export TERM=xterm
