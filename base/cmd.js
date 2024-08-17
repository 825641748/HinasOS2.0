const express = require('express');
const {
	spawn
} = require('child_process');
const iconv = require('iconv-lite');

function CMD(command) {
	return new Promise((resolve, reject) => {
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
	})

}
module.exports = CMD