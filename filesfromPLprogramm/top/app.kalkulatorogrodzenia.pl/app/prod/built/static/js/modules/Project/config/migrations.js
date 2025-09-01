/*
*

joniec-roma_classic
	pole:
		brsm		0.504	0.20	0.20
		brmm		0.252	0.20	0.20	*
		brdm		0.36	0.20	0.36	*
		c2-brsm		0.504	0.20	0.20
		c1-brdm		0.36	0.20	0.36	**
		c2-brdm		0.36	0.20	0.36	*
	wall:
		brsm		0.504	0.20	0.20
		brdm		0.36	0.20	0.36	*

joniec-roma_diamond
	pole:
		rd20		0.504	0.20	0.20
		c2-rd20		0.504	0.20	0.20
	wall:
		rd20		0.504	0.20	0.20

joniec-roma_horizon
	pole:
		bh20		0.504	0.20	0.20
		bh28		0.504	0.20	0.28
		c2-bh20		0.504	0.20	0.20
		c2-bh28		0.504	0.20	0.28
	wall:
		bh20		0.504	0.20	0.20
		bh28		0.504	0.20	0.28

joniec-roma_perfect
	pole:
		rp20		0.504	0.20	0.20
		rp28		0.504	0.20	0.28
		c2-rp20		0.504	0.20	0.20
		c2-rp28		0.504	0.20	0.28
	wall:
		rp20		0.504	0.20	0.20
		rp28		0.504	0.20	0.28

*
*/


export default () => ({
	roma: {
		pole: {
			_504_20: {
				'joniec-roma_classic': ['brsm', 'brmm'],
				'joniec-roma_diamond': ['rd20'],
				'joniec-roma_horizon': ['bh20'],
				'joniec-roma_perfect': ['rp20'],
			},
			_504_28: {
				'joniec-roma_classic': ['brdm'],
				'joniec-roma_diamond': ['rd20'],
				'joniec-roma_horizon': ['bh28'],
				'joniec-roma_perfect': ['rp28'],
			},
			C2_504_20: {
				'joniec-roma_classic': ['c2-brsm'],
				'joniec-roma_diamond': ['c2-rd20'],
				'joniec-roma_horizon': ['c2-bh20'],
				'joniec-roma_perfect': ['c2-rp20'],
			},
			C2_504_28: {
				'joniec-roma_classic': ['c2-brdm', 'c1-brdm'],
				'joniec-roma_diamond': ['c2-rd20'],
				'joniec-roma_horizon': ['c2-bh28'],
				'joniec-roma_perfect': ['c2-rp28'],
			},
		},
		wall: {
			_504_20: {
				'joniec-roma_classic': ['brsm'],
				'joniec-roma_diamond': ['rd20'],
				'joniec-roma_horizon': ['bh20'],
				'joniec-roma_perfect': ['rp20'],
			},
			_504_28: {
				'joniec-roma_classic': ['brdm'],
				'joniec-roma_diamond': ['rd20'],
				'joniec-roma_horizon': ['bh28'],
				'joniec-roma_perfect': ['rp28'],
			},
		},
	},
});