const express = require('express');
const {
	spawn
} = require('child_process');
const iconv = require('iconv-lite');

// 定义一个允许执行的命令列表
const allowedCommands = [
	'dir', // Windows下列出目录内容
	'ls', // Unix/Linux下列出目录内容
	'pwd', // 显示当前工作目录的完整路径
	'cd', // 更改当前工作目录
	'echo', // 显示一行文本或字符串
	'cat', // Unix/Linux下查看文件内容
	'head', // 查看文件的开头部分
	'tail', // 查看文件的结尾部分
	'more', // 分页显示文本文件的内容
	'less', // 类似于more，‌但支持反向查看和搜索
	'cp', // 复制文件或目录
	'mv', // 移动或重命名文件或目录
	'rm', // 删除文件或目录
	'mkdir', // 创建新目录
	'rmdir', // 删除空目录
	'touch', // 创建空文件或更改文件时间戳
	'chmod', // 更改文件或目录的权限
	'chown', // 更改文件或目录的拥有者和群组
	'df', // 显示磁盘空间使用情况
	'du', // 显示目录或文件的磁盘使用情况
	'ps', // 显示当前进程的快照
	'top', // 显示实时进程信息
	'kill', // 发送信号到进程
	'ping', // 测试与远程主机的连接
	'ifconfig', // Unix/Linux下配置和显示网络接口参数
	'ipconfig', // Windows下显示网络接口配置信息
	'netstat', // 显示网络连接、‌路由表、‌接口统计等信息
	'traceroute', // Unix/Linux下追踪数据包到主机的路径
	'nslookup', // 查询Internet域名服务器以获取域名或IP地址的映射信息
	'dig' // Unix/Linux下查询DNS信息的工具
];


function isValidCommand(command) {
	const parts = command.split(' ');
	let cmd = parts[0];
	// 检查命令是否以 'sudo' 开头
	if (command.startsWith('sudo')) {
		cmd = parts[1];
	}
	// 检查命令是否在允许列表中
	if (!allowedCommands.includes(cmd)) {
		return false;
	}

	return true;
}

function CMD(command) {
	return new Promise((resolve, reject) => {
		if (!isValidCommand(command)) {
			return reject({
				output: 'Unauthorized command'
			});
		}

		const {
			spawn
		} = require('child_process');
		const iconv = require('iconv-lite');
		const child = spawn(command, {
			shell: true
		});
		let result = '';

		child.stdout.on('data', (data) => {
			result += iconv.decode(data, 'gbk');
		});

		child.stderr.on('data', (data) => {
			result += iconv.decode(data, 'gbk');
		});

		child.on('close', (code) => {
			resolve({
				output: result,
				code
			});
		});
	});
}

module.exports = CMD;