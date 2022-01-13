module.exports = {
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module allows you to control JTF4\'s Ugreen KVM changer for M5-ATOM',
			},
			{
				type: 'textinput',
				id: 'ip',
				label: 'IP',
				width: 12,
				regex: this.REGEX_IP,
				default: '192.168.1.1',
				required: true,
			}
		]
	},
}