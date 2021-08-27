import React, {useState, useEffect, useCallback} from 'react'
import {useForm} from 'react-hook-form';
import styles from '../../../../assets/scss/routes/index.scss'
import classNames from 'classnames/bind'
import {Button, Card, LoadingOverlay, Table, Modal, FormField, Tooltip} from "../../../components";

import {IoAddCircleSharp as AddIcon, AiOutlineDownload as DownloadIcon, FaSave as SaveIcon, HiUpload as LoadIcon, AiFillEdit as EditIcon, BsTrash as DeleteIcon} from "react-icons/all";

const cx = classNames.bind(styles)

const IndexView = ({fetchBooks, isLoading, books, saveBooks, loadBooks, deleteBook, editBook, addBook}) => {
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [toDeleteId, setToDeleteId] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [toEditId, setToEditId] = useState(false);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm({
        mode: "onChange",
    });

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: {errors: errors2},
        setValue: setValue2
    } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        register("title", {required: true, value: (toEditId !== false ? books[toEditId]['title'] : '')})
        register("kind", {required: true, value: (toEditId !== false ? books[toEditId]['kind'] : '')})
    }, [toEditId]);

    useEffect(() => {
        register2("title", {required: true, value: ''})
        register2("kind", {required: true, value: ''})
    }, [isModalCreateVisible]);

    return (
        <div className={cx('route--index')}>
            <Card
                header={<h1>Books</h1>}
                headerActions={[
                    <Button
                        onClick={() => {
                            fetchBooks()
                        }}
                        color={'success'}
                        key={'fetch'}
                    ><DownloadIcon/> Fetch</Button>,
                    <Button
                        onClick={() => {
                            setIsModalCreateVisible(true)
                        }}
                        color={'success'}
                        key={'add'}
                    ><AddIcon /> Add</Button>,
                    <Button
                        onClick={() => {
                            saveBooks()
                        }}
                        key={'save'}
                    ><SaveIcon/> Save</Button>,
                    <Button
                        onClick={() => {
                            loadBooks()
                        }}
                        key={'load'}
                    ><LoadIcon />Load</Button>
                ]}
            >
                <Table.Container>
                    <Table.THead>
                        <Table.Tr>
                            <Table.Th xs={3}>Title</Table.Th>
                            <Table.Th xs={3}>Kind</Table.Th>
                            <Table.Th xs={1}>Thumbnail</Table.Th>
                            <Table.Th xs={5}>Actions</Table.Th>
                        </Table.Tr>
                    </Table.THead>
                    <Table.TBody>
                        {books.map((book, index) => (
                            <Table.Tr key={index}>
                                <Table.Td xs={3}>
                                    {book['title']}
                                </Table.Td>
                                <Table.Td xs={3}>
                                    {book['kind']}
                                </Table.Td>
                                <Table.Td xs={1}>
                                    <Tooltip
                                        tooltip={(
                                            <div style={{
                                                width: 139,
                                                height: 193,
                                            }}>
                                                <img src={`https://wolnelektury.pl/media/${book['cover_thumb']}`}
                                                     style={{
                                                         maxWidth: 139,
                                                         maxHeight: 193,
                                                     }}/>
                                            </div>
                                        )}
                                        placement={'bottom'}
                                    >
                                        hover me
                                    </Tooltip>
                                </Table.Td>
                                <Table.Td xs={5}>
                                    <Button size={'sm'} onClick={() => {
                                        setToEditId(index)
                                        setIsModalEditVisible(true);
                                    }}><EditIcon/> Edit</Button>{' '}
                                    <Button size={'sm'} color={'danger'} onClick={() => {
                                        setToDeleteId(index);
                                        setIsModalDeleteVisible(true);
                                    }}><DeleteIcon/> Delete</Button>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.TBody>
                </Table.Container>
                {isLoading && (
                    <LoadingOverlay/>
                )}
            </Card>
            <Modal.Container color='warning' visible={isModalDeleteVisible}>
                <Modal.Header>Confirm</Modal.Header>
                <Modal.Body>
                    <p>Are you sure to delete this book?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setIsModalDeleteVisible(false)
                        setToDeleteId(false)
                    }}>Cancel</Button>
                    <Button color={'success'} onClick={() => {
                        setIsModalDeleteVisible(false)
                        deleteBook(toDeleteId)
                        setToDeleteId(false)
                    }}>OK</Button>
                </Modal.Footer>
            </Modal.Container>
            <Modal.Container color='primary' visible={isModalEditVisible}>
                <Modal.Header>Edit book</Modal.Header>
                <Modal.Body>
                    <FormField
                        label={'Title'}
                        placeholder={'Title'}
                        required
                        type={'text'}
                        error={errors['title']?.type}
                        defaultValue={toEditId !== false ? books[toEditId]['title'] : ''}
                        {...register("title", {required: true})}
                        onChange={(e) => {
                            setValue('title', e.target.value)
                        }}
                    />
                    <FormField
                        label={'Kind'}
                        placeholder={'Kind'}
                        required
                        type={'text'}
                        error={errors['kind']?.type}
                        defaultValue={toEditId !== false ? books[toEditId]['kind'] : ''}
                        {...register("kind", {required: true})}
                        onChange={(e) => {
                            setValue('kind', e.target.value)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setIsModalEditVisible(false)
                        setToEditId(false)
                    }}>Cancel</Button>
                    <Button color={'success'} onClick={() => {
                        handleSubmit((data) => {
                            editBook(toEditId, data);
                            setIsModalEditVisible(false)
                            setToEditId(false)
                        })()
                    }}>OK</Button>
                </Modal.Footer>
            </Modal.Container>
            <Modal.Container color='primary' visible={isModalCreateVisible}>
                <Modal.Header>Create book</Modal.Header>
                <Modal.Body>
                    <FormField
                        label={'Title'}
                        placeholder={'Title'}
                        required
                        type={'text'}
                        error={errors2['title']?.type}
                        {...register2("title", {required: true})}
                        onChange={(e) => {
                            setValue2('title', e.target.value)
                        }}
                    />
                    <FormField
                        label={'Kind'}
                        placeholder={'Kind'}
                        required
                        type={'text'}
                        error={errors2['kind']?.type}
                        {...register2("kind", {required: true})}
                        onChange={(e) => {
                            setValue2('kind', e.target.value)
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setIsModalCreateVisible(false)
                    }}>Cancel</Button>
                    <Button color={'success'} onClick={() => {
                        handleSubmit2((data) => {
                            addBook(data);
                            setIsModalCreateVisible(false)
                        })()
                    }}>OK</Button>
                </Modal.Footer>
            </Modal.Container>
        </div>
    )
}

export default {IndexView}
export {IndexView}
