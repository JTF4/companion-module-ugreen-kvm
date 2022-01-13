module.exports = {
	initActions() {
		const actions = {
			setInput: {
				label: 'Set Input',
				options: [
					{
						type: 'dropdown',
						label: 'Input',
						id: 'input',
						choices: [
							{ id: '1', label: 'Input 1' },
							{ id: '2', label: 'Input 2' },
                            { id: '3', label: 'Input 3' }
						],
						default: '1',
					},
				],
			},
            next: {
				label: 'Next Input',
				options: [
				],
			},
        }
		this.setActions(actions)
	},

	action(action) {
        let commandString = '';

		if (this.config.ip) {
			switch (action.action) {
				case 'setInput': {
					commandString = 'input' + action.options.input;
                    this.log('debug','Command:' + commandString);
					break
				}
				case 'nextInput': {
					commandString = 'next';
                    this.log('debug','Command:' + commandString);
					break
				}
			}

			if (commandString != null || undefined) {
                this.socket.send(commandString);
			}
		}
	},
}