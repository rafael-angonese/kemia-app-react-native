import React from 'react'
import { View, Button, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { useAuth } from '../../contexts/auth'
import * as CourseActions from '../../store/actions/course'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

const Home = ({ modules, toggleLesson }) => {

    const { user, signOut } = useAuth()

    async function handleSignOut() {
        signOut()
    }

    return (

        <View style={styles.container}>
            {
                modules.map(module => (
                    <View key={module.id}>

                        <Text>{module.title}</Text>

                        <Text>
                            {module.leassons.map(lesson => (
                                <TouchableOpacity key={lesson.id} onPress={() => toggleLesson(module, lesson)}>
                                    <Text>{lesson.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </Text>

                    </View>

                ))
            }
        </View>
    )

    // return (
    //     <View style={styles.container}>
    //         <Text>{user ?.name}</Text>
    //         <Button title="Logout" onPress={() => { handleSignOut() }} />
    //     </View>
    // )
}

const mapStateProps = state => ({
    modules: state.course.modules
})

const mapDispatchToProps = dispatch => (
    bindActionCreators(CourseActions, dispatch)
)

export default connect(
    mapStateProps,
    mapDispatchToProps
)(Home)