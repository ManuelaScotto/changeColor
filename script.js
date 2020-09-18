// //////////////////////////////////////////////////////////////////////////
// COMPONENTE BUTTON 
// ottengo un colore diverso per ogni bottone
// //////////////////////////////////////////////////////////////////////////

function Buttons(props) {
    return (
        <button className="color" style={{ backgroundColor: props.c }} onClick={() => props.colorChange(props.c)}>
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
        <div className="dropdown" style={{ opacity: props.isOpen ? 1 : 0 }} >
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
            bckColor: 'white',
            id: [1, 2, 3], //id delle card
            colors: props.colors, //recupero l'array colors da Card in App per poterlo mappare
            font: props.font,
            fontName: props.fontName
        }
        this.handleColor = this.handleColor.bind(this)
    }
    handleColor(color) { //recupero il colore in base al click del mouse
        this.setState({
            bckColor: color,
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
    render() {
        return (
            /* modifico il background color delle card in base al click del mouse (recupero color da handlecolor) */
            <div className="card" style={{ backgroundColor: this.state.bckColor }}>
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
                                color={this.state.colors}
                                c={cl}
                                colorChange={this.handleColor}
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
        </div>
    )
}



ReactDOM.render(<App />, document.getElementById('root'))