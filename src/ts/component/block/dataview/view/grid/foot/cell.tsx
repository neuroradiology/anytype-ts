import * as React from 'react';
import { observer } from 'mobx-react';
import { Select } from 'Component';
import { I, S, C, keyboard, Relation, Dataview } from 'Lib';

interface Props extends I.ViewComponent, I.ViewRelation {
	rootId?: string;
	block?: I.Block;
};

interface State {
	isEditing: boolean;
	result: any;
};

const FootCell = observer(class FootCell extends React.Component<Props, State> {

	state = {
		isEditing: false,
		result: null,
	};

	constructor (props: Props) {
		super(props);

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
	};

	render () {
		const { relationKey, block } = this.props;
		const { isEditing, result } = this.state;
		const relation = S.Record.getRelationByKey(relationKey);
		
		if (!relation) {
			return null;
		};

		const cn = [ 'cellFoot', `cell-key-${relationKey}` ];
		const options = Relation.formulaByType(relation.format);

		return (
			<div 
				id={Relation.cellId('foot', relationKey, '')} 
				className={cn.join(' ')}
				onClick={() => this.setEditing(true)}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
			>
				<div className="cellContent">
					<div className="flex">
						{isEditing ? (
							<Select 
								id={`grid-foot-select-${relationKey}-${block.id}`} 
								value="" 
								options={options} 
								onChange={id => this.onChange(id)}
							/>
						) : result}
					</div>
				</div>
			</div>
		);
	};

	componentDidMount (): void {
		this.calculate();
	};

	componentDidUpdate (): void {
	};

	setEditing (isEditing: boolean): void {
		this.setState({ isEditing });
	};

	calculate () {
		const { rootId, block, relationKey, getView } = this.props;
		const view = getView();
		const viewRelation = view.getRelation(relationKey);
		const result = Dataview.getFormulaResult(rootId, block.id, relationKey, viewRelation);

		this.setState({ result });
	};

	onChange (id: string): void {
		const { rootId, block, relationKey, getView } = this.props;
		const view = getView();
		const relations = view.getRelations();
		const idx = relations.findIndex(it => it.relationKey == relationKey);

		console.log(view);

		/*
		
		const item = view.getRelation(relationKey);

		item.formulaType = Number(id) || I.FormulaType.None;

		console.log(JSON.stringify(view, null, 3));

		S.Record.viewUpdate(rootId, view.id, view);
		//C.BlockDataviewViewRelationReplace(rootId, block.id, view.id, item.relationKey, { ...item, formulaType: item.formulaType });
		this.setState({ isEditing: false });
		*/
	};

	onMouseEnter (): void {
		const { block, relationKey } = this.props;

		if (!keyboard.isDragging) {
			$(`#block-${block.id} .cell-key-${relationKey}`).addClass('cellKeyHover');
		};
	};

	onMouseLeave () {
		$('.cellKeyHover').removeClass('cellKeyHover');
	};

});

export default FootCell;