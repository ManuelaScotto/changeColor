// //////////////////////////////////////////////////////////////////////////
// COMPONENTE BUTTON 
// ottengo un colore diverso per ogni bottone al passaggio del mouse sul bottone
// //////////////////////////////////////////////////////////////////////////

function Buttons(props) {
    return (
        <button className="color" style={{ backgroundColor: props.c }} onMouseEnter={() => props.colorChange(props.c, props.id)}
            onMouseLeave={() => props.mouseOff()}
        >
            <p>{props.c}</p>
        </button>
    )
}

// //////////////////////////////////////////////////////////////////////////
// COMPONENTE CARDFONT
// ottengo un font diverso per ogni card
// //////////////////////////////////////////////////////////////////////////

function CardFont(props) {
    return (
        <div>
            <h2 style={{ fontFamily: props.f }}>{props.fontName}</h2>
            <p style={{ fontFamily: props.f }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
    )
}

// //////////////////////////////////////////////////////////////////////////
// COMPONENTE DROPDOWN
// al click visualizzo e nascondo il dropdown
// //////////////////////////////////////////////////////////////////////////

const DropDown = (props) => {
    return (
        <div className="dropdown" style={{ opacity: props.isOpen ? 1 : 0 }}>
            <ul>
                <li>Esporta</li>
                <li className="border" >Font Preferito</li>
                <li>Licenza</li>
            </ul>
        </div >
    )
}

// //////////////////////////////////////////////////////////////////////////
// COMPONENTE CARD
// //////////////////////////////////////////////////////////////////////////

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dropIsOpen: false, //per il dropdown (inizialmente è false)
            transition: false,
            bckColor: 'white',
            id: [1, 2, 3], //id delle card
            colors: props.colors, //recupero l'array colors da Card in App per poterlo mappare
            font: props.font,
            fontName: props.fontName,
            colorInput: ''
        }
        this.handleColor = this.handleColor.bind(this)
        this.mouseOff = this.mouseOff.bind(this)
    }
    handleColor(color) { //recupero il colore in base al click del mouse
        this.setState({
            bckColor: color,
            transition: true
        })
    }

    handleClick() {  // visualizza e nasconde dropdown al click
        if (!this.state.dropIsOpen) {
            this.setState({
                dropIsOpen: true
            })
        } else {
            this.setState({
                dropIsOpen: false
            })
        }
    }
    handleSubmit = (e) => { //onSubmit dell'input
        e.preventDefault();
        this.setState({
            bckColor: this.state.colorInput,
            transition: true,
            colorInput: ''
        })
    }
    handleChange = (e) => { //modifica il background color in base al colore che inserisco nell'input (value)
        this.setState({
            colorInput: e.target.value
        })
    }
    mouseOff() { //quando tolgo il mouse il background color mi ritorna null
        this.setState({
            bckColor: null
        })
    }
    render() {
        return (
            /* modifico il background color delle card in base al click del mouse (recupero color da handlecolor) */
            <div className="card" style={{ backgroundColor: this.state.bckColor, transition: this.state.transition && '1.1s' }}>
                <div className="contrast">
                    {/* inserisco la i all'interno di un div per poter utilizzare onClick */}
                    <div className="i" style={{ width: 20, height: 30 }} onClick={() => this.handleClick()} ><i className="fas fa-ellipsis-v"></i></div>
                    <DropDown isOpen={this.state.dropIsOpen}>
                        {/* se isOpen diventa true allora visualizza */}
                    </DropDown>
                    <h4>CONTRAST : </h4>
                    {this.state.colors.map((cl, key) => {
                        return (
                            <Buttons
                                // recupero i colori dei bottoni 
                                key={this.state.id[key]}
                                id={this.state.id[key]}
                                color={this.state.colors}
                                c={cl}
                                colorChange={this.handleColor}
                                mouseOff={this.mouseOff}
                            />
                        )
                    })
                    }
                </div >
                <div className="font">
                    {this.state.font.map((font, key) => {
                        return (
                            <CardFont
                                // recupero i font e i fontName
                                key={this.state.id[key]}
                                font={this.state.font}
                                fontName={this.state.fontName}
                                f={font}
                            />
                        )
                    })
                    }
                </div>
                <form onSubmit={this.handleSubmit} noValidate>
                    <input type="text" value={this.state.colorInput} placeholder="Inserisci un colore" onChange={this.handleChange} onMouseOut={() => this.setState({ transition: false })} autoComplete="off" />
                </form>
            </div>
        )
    }
}

// //////////////////////////////////////////////////////////////////////////
// COMPONENTE APP
// creo le 3 card con le sue caratteristiche
// //////////////////////////////////////////////////////////////////////////

function App() {
    return (
        <div className="container">
            <Card colors={['#ff9a00', '#ff5700', '#ff0340']} font={["Verdana, Geneva, Tahoma, sans-serif"]} fontName={['Verdana']} />
            <Card colors={['#B0E0E6', '#00ADB5', '#45969B']} font={["Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"]} fontName={['Impact']} />
            <Card colors={['#DDA0DD', '#800080', '#2F35C5']} font={["Arial, Helvetica, sans-serif"]} fontName={['Arial']} />
            <Card colors={['#B3FDFD', '#00FFFF', ' #7FFFD4']} font={['Lucida Grande']} fontName={['Lucida']} />
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))