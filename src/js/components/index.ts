import { Card } from './ui/Card/index'
import { Checkbox } from './form/Checkbox/index'
import { Button } from './ui/Button/index'
import { LoadingOverlay } from './ui/LoadingOverlay/index'
import { Select } from './form/Select/index'
import { TextField } from './form/TextField/index'
import { Row } from './ui/Row/index'
import { Col } from './ui/Col/index'
import { FormField } from './form/FormField/index'
import { TextArea } from './form/TextArea/index'
import { Radio } from './form/Radio/index'
import {
    Table as TableContainer,
    Th as ThComponent,
    THead as THeadComponent,
    TBody as TBodyComponent,
    Td as TdComponent,
    Tr as TrComponent,
} from './ui/Table'
import { Tooltip } from './ui/Tooltip'
import { ModalContainer, ModalBody, ModalFooter, ModalHeader } from './ui/Modal'

const Table = {
    Container: TableContainer,
    Th: ThComponent,
    THead: THeadComponent,
    TBody: TBodyComponent,
    Td: TdComponent,
    Tr: TrComponent,
}

const Modal = {
    Container: ModalContainer,
    Body: ModalBody,
    Header: ModalHeader,
    Footer: ModalFooter,
}

export {
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    TextField,
    Row,
    Col,
    FormField,
    TextArea,
    Radio,
    Modal,
    Table,
    Tooltip,
}

export default {
    TextField,
    LoadingOverlay,
    Button,
    Select,
    Checkbox,
    Card,
    Row,
    Col,
    FormField,
    TextArea,
    Radio,
    Modal,
    Table,
    Tooltip,
}
